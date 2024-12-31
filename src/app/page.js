import LayoutComp from "./layout-component/page";
import "@/styles/font.scss";
import "@/styles/_variable.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/button-component.scss";
import "@/styles/inputbox-component.scss";

export default function Home() {
  return (
    <div>
      <LayoutComp />
    </div>
  );
}
