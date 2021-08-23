const getBasePageData = async (
  siteId: string,
  requestInit: RequestInit
): Promise<IBasePageData> => {
  const [siteConfigsRequest, themeConfigsRequest] = await Promise.all([
    fetch(`https://api.1eg.dev/eco-store/site/${siteId}/configs`, requestInit),
    fetch(`https://api.1eg.dev/eco-store/site/${siteId}/DESKTOP/configs`, requestInit)
  ])

  const themeConfigs = await themeConfigsRequest.json()

  const menus = await getMenus(
    requestInit,
    themeConfigs.full_menu,
    themeConfigs.main_menu,
    themeConfigs.topbar_menu,
    themeConfigs.main_menu_levels
  )

  return {
    seo: {
      title: 'Home',
      content: {
        main: '',
        additional: ''
      },
      metadata: []
    },
    site: {
      configs: await siteConfigsRequest.json()
    },
    theme: {
      configs: themeConfigs
    },
    menus
  }
}

export const getHomePageData = async (
  siteId: string,
  accountId: string
): Promise<IPageHomeData> => {
  const requestInit: RequestInit = {
    headers: {
      'x-account': accountId
    }
  }

  const basePageData = await getBasePageData(siteId, requestInit)

  const [banners, showcases] = await Promise.all([
    getHomeBanners(
      requestInit,
      basePageData.theme.configs.main_banner_home,
      basePageData.theme.configs.first_banner_home,
      basePageData.theme.configs.second_banner_home
    ),
    getHomeShowcases(
      requestInit,
      basePageData.theme.configs.first_showcase_home,
      basePageData.theme.configs.second_showcase_home,
      basePageData.theme.configs.third_showcase_home
    )
  ])

  return {
    ...basePageData,
    banners,
    showcases
  }
}

const getHomeBanners = async (requestInit: RequestInit, ...bannerIds: string[]) => {
  const banners: any = []

  await Promise.all(
    bannerIds
      .filter((v, i, self) => !!v && self.indexOf(v) === i)
      .map(async bannerId => {
        const banner = {
          ...(await (
            await fetch(`https://api.1eg.dev/eco-content/banner/${bannerId}`, requestInit)
          ).json()),
          items: await (
            await fetch(`https://api.1eg.dev/eco-content/banner/${bannerId}/items`, requestInit)
          ).json()
        }

        if (!!banner.code) return

        banners.push(banner)
      })
  )

  return banners
}

const getHomeShowcases = async (requestInit: RequestInit, ...showcaseIds: string[]) => {
  const showcases: any = []

  await Promise.all(
    showcaseIds
      .filter((v, i, self) => !!v && self.indexOf(v) === i)
      .map(async showcaseId => {
        const showcase = await (
          await fetch(`https://api.1eg.dev/eco-content/showcase/${showcaseId}/render`, requestInit)
        ).json()

        if (!!showcase.code) return

        showcases.push(showcase)
      })
  )

  return showcases
}

const getMenus = async (requestInit: RequestInit, ...menuIds: string[]) => {
  const menus: any = []

  await Promise.all(
    menuIds
      .filter((v, i, self) => !!v && self.indexOf(v) === i)
      .map(async menuId => {
        const menu = {
          ...(await (
            await fetch(`https://api.1eg.dev/eco-content/menu/${menuId}`, requestInit)
          ).json()),
          items: await (
            await fetch(`https://api.1eg.dev/eco-content/menu/${menuId}/items/render`, requestInit)
          ).json()
        }

        if (!!menu.code) return

        menus.push(menu)
      })
  )

  return menus
}

export interface IBasePageData {
  seo: {
    title: string
    content: {
      main: string
      additional: string
    }
    metadata: {
      id: string
      name: string
      type: string
    }[]
  }
  site: {
    configs: any
  }
  theme: {
    configs: any
  }
  menus: any
}

export interface IPageHomeData extends IBasePageData {
  banners: any
  showcases: any
}
