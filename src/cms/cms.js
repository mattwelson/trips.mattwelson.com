import CMS from "netlify-cms";

import TripPreview from "./preview-templates/TripPreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("trip", TripPreview);
