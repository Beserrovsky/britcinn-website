import {
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { Home, Tables } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "floorplan",
        path: "/floorplan",
        element: <Tables />,
      },
    ],
  }
];

export default routes;
