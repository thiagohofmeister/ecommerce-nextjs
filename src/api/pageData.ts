const getBasePageData = async (siteId: string, requestInit: RequestInit) => {
  const [siteConfigsRequest, themeConfigsRequest] = await Promise.all([
    fetch(`https://api.1eg.dev/eco-store/site/${siteId}/configs`, requestInit),
    fetch(`https://api.1eg.dev/eco-store/site/${siteId}/DESKTOP/configs`, requestInit)
  ])

  return {
    seo: {
      title: 'Home',
      description: 'Home'
    },
    site: {
      configs: await siteConfigsRequest.json()
    },
    theme: {
      configs: await themeConfigsRequest.json()
    }
  }
}

export const getHomePageData = async (siteId: string, accountId: string) => {
  const requestInit: RequestInit = {
    headers: {
      'x-account': accountId
    }
  }

  const basePageData = await getBasePageData(siteId, requestInit)

  const [banners, showcases, menus] = await Promise.all([
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
    ),
    getMenus(
      requestInit,
      basePageData.theme.configs.full_menu,
      basePageData.theme.configs.main_menu,
      basePageData.theme.configs.topbar_menu,
      basePageData.theme.configs.main_menu_levels
    )
  ])

  return {
    ...basePageData,
    banners,
    showcases,
    menus
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
