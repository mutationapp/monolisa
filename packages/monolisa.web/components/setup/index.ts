import Installation from './installation'
import Integration from './integration'
import Import from './import'
import Setup from './setup'
import Privacy from './privacy'
import Introduction from './introduction'
import Contact from './contact'

export type sectionType =
  | 'introduction'
  | 'privacy'
  | 'installation'
  | 'import'
  | 'integration'
  | 'contact'

export default Setup

export { Contact, Import, Installation, Integration, Introduction, Privacy }
