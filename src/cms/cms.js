import CMS from "netlify-cms";

import Trip from "./preview-templates/TripPreview";

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("trip", TripPreview);
