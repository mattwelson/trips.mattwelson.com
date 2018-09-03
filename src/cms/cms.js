import CMS from 'netlify-cms'
import typography from '../utils/typography'

import TripPreview from './preview-templates/TripPreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewStyle(typography.toString(), { raw: true })
CMS.registerPreviewTemplate('trip', TripPreview)
