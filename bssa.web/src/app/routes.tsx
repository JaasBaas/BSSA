import React from 'react';
import { HookRouter } from 'hookrouter';

import { Home } from './Home';
import { ProductSearch } from '../pages/product/productSearch';
import { ProductEditPage } from '../pages/product/productEditPage';
import { TestPage } from '../pages/test/testPage';
import CatalogueEditPage from '../pages/special/catalogueEditPage';

const routes: HookRouter.RouteObject = {
  '/': () => <Home />,

  '/catalogue/edit/:id': ({ id }) => <CatalogueEditPage specialId={id} />,

  '/Product/Search': () => <ProductSearch />,
  '/Product/Edit/:id': ({ id }) => <ProductEditPage productId={id} />,

  '/TestPage': () => <TestPage />
};

export default routes;
