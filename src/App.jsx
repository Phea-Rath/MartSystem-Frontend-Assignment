import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import Main from './layouts/Main'
import Dashboard from './components/Dashboard';
import SettingsPage from './components/Setting/SettingsPage';
import LogoutPage from './components/Logout/LogoutPage';
import RoleList from './components/roles/RoleList';
import RoleForm from './components/roles/RoleForm';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import CategoryList from './components/categories/CategoryList';
import BrandPage from './components/brands/BrandList';
import LoginPage from './components/Logout/LoginPage';
import { AlertProvider } from './hooks/AlertContext';
import ProductListPage from './components/products/ProductList';
import ProductViewPage from './components/products/ProductDetail';
import ProductFormPage from './components/products/ProductForm';
import SupplierList from './components/suppliers/SupplierList';
import CustomerList from './components/customers/CustomerList';
import StockTypeList from './components/stockTypes/StockTypeList';
import WarehouseList from './components/warehouses/WarehouseList';
import PurchaseList from './components/purchases/PurchaseList';
import PurchaseDetails from './components/purchases/PurchaseDetail';
import PurchaseForm from './components/purchases/PurchaseForm';
import InventoryList from './components/inventories/InventoryList';
import InventoryForm from './components/inventories/InventoriesForm';
import InventoryDetails from './components/inventories/InventoryDetail';
import SalePage from './components/orders/SalePage';
import MarketSalePage from './components/markets/MarketPage';
import OrderListPage from './components/orders/OrderList';
import OrderDetails from './components/orders/OrderDetail';
import OrderUpdate from './components/orders/OrderUpdate';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: 1,
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/setting',
        element: <SettingsPage />
      },

      //Users
      {
        path: '/users',
        element: <UserList />
      },
      {
        path: '/users/create',
        element: <UserForm />
      },
      {
        path: '/users/edit/:id',
        element: <UserForm />
      },

      //Categories
      {
        path: '/categories',
        element: <CategoryList />
      },

      //Brands
      {
        path: '/brands',
        element: <BrandPage />
      },

      //Roles
      {
        path: '/roles',
        element: <RoleList />
      },

      //Products
      {
        path: '/products',
        element: <ProductListPage />
      },
      {
        path: '/products/view/:id',
        element: <ProductViewPage />
      },
      {
        path: '/products/create',
        element: <ProductFormPage />
      },
      {
        path: '/products/edit/:id',
        element: <ProductFormPage />
      },

      //Suppliers
      {
        path: '/suppliers',
        element: <SupplierList />
      },

      //Customers
      {
        path: '/customers',
        element: <CustomerList />
      },

      //Stock Types
      {
        path: '/stock-types',
        element: <StockTypeList />
      },

      //Warehouse
      {
        path: '/warehouses',
        element: <WarehouseList />
      },

      //Purchases
      {
        path: '/purchases',
        element: <PurchaseList />
      },
      {
        path: '/purchases/view/:id',
        element: <PurchaseDetails />
      },
      {
        path: '/purchases/create',
        element: <PurchaseForm />
      },
      {
        path: '/purchases/edit/:id',
        element: <PurchaseForm />
      },

      //Inventories
      {
        path: '/inventories',
        element: <InventoryList />
      },
      {
        path: '/inventories/create',
        element: <InventoryForm />
      },
      {
        path: '/inventories/edit/:id',
        element: <InventoryForm />
      },
      {
        path: '/inventories/view/:id',
        element: <InventoryDetails />
      },

      //Orders
      {
        path: '/sales',
        element: <SalePage />
      },
      {
        path: '/orders',
        element: <OrderListPage />
      },
      {
        path: '/orders/view/:id',
        element: <OrderDetails />
      },
      {
        path: '/orders/edit/:id',
        element: <OrderUpdate />
      },
    ]
  },
  {
    path: '/market',
    element: <MarketSalePage />
  },
  {
    path: '/logout',
    element: <LogoutPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
]);

function App() {

  return (
    <AlertProvider>
      <RouterProvider router={routers}>
        <Outlet />
      </RouterProvider>
    </AlertProvider>
  )
}

export default App
