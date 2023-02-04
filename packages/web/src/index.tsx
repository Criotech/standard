import "normalize.css";
import "antd/dist/antd.css";
import "./index.scss";
import "./typography.scss";
import ReactDOM from "react-dom";
import Root from "./Root";
import { TrackingService } from "@myacuvue_thailand_web/services";

document.addEventListener("DOMContentLoaded", function () {
	TrackingService.register();
	ReactDOM.render(<Root />, document.getElementById("root"));
});
