import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@orfium/ictinus/dist/components/Drawer/types';
import { PageOption } from './types';

export const getLazyComponent = (page: PageOption) => {
  const LazyComponent = (Component: any) => (props: any) => {
    return (
      <Suspense fallback={<div>Loading Page...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };

  const component = page.component;

  return LazyComponent(component);
};

export const pageUtils = (pages: PageOption[]) => {
  const constructPageLinks = () => {
    const getPageLinks: (nestedPages?: PageOption[], parentUrl?: string) => any = (
      nestedPages,
      parentUrl
    ) =>
      nestedPages?.map((page) => {
        const { url, title, id } = page;
        const hasNestedRoutes = page?.routes?.length;

        if (hasNestedRoutes) {
          return getPageLinks(page.routes, page.url());
        }

        return (
          <Link
            key={`link_${id}`}
            to={{
              pathname: parentUrl + url(),
              state: {
                pageTitle: title,
                pageId: id,
              },
            }}
          >
            {title}
          </Link>
        );
      });

    const pageLinks = getPageLinks(pages);
    return pageLinks?.flat(Infinity);
  };

  const createMenuItem = (
    { title, id, url, visible, iconName, routes }: PageOption,
    mapper: (pages: PageOption[]) => MenuItem[]
  ): MenuItem => {
    const options: MenuItem[] = routes ? mapper(routes) : [];

    return {
      name: title,
      url: url(),
      state: {
        pageId: id,
        pageTitle: title,
      },
      visible,
      iconName,
      options,
    };
  };

  const mapPagesToMenuItems = (): MenuItem[] => {
    const pagesMapper = (pages: PageOption[]) => {
      return pages.map((page) => {
        return createMenuItem(page, pagesMapper);
      });
    };

    return pagesMapper(pages);
  };

  const getPages = () => {
    return pages;
  };

  return {
    getLazyComponent,
    constructPageLinks,
    mapPagesToMenuItems,
    getPages,
  };
};
