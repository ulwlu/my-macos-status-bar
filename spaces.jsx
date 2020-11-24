import Spaces from './lib/components/Spaces.jsx'
import Error from './lib/components/Error.jsx'

import { parseJson } from './lib/utils.js'
import { getSettings } from './lib/settings.js'

import * as Styles from './lib/styles/Styles.js'

const refreshFrequency = false

const settings = getSettings()

const className = `
  ${Styles.BaseStyles}
  ${Styles.SpacesStyles}

  ${settings.global.floatingBar ? Styles.FloatingBarOverride : ''}
  ${settings.global.noBarBg ? Styles.NoBarBgOverride : ''}
  ${settings.global.bottomBar ? Styles.BottomBarOverride : ''}
  ${settings.global.floatingBar && settings.global.bottomBar ? Styles.FloatinBottomBarOverride : ''}
`

const { shell } = settings.global

const command = `${shell} simple-bar/lib/scripts/get_spaces.sh`

const render = (state) => {
  const { output, error } = state
  if (error) return <Error widget="spaces" type="error" />
  if (!output) return <Error widget="spaces" type="noOutput" />

  const data = parseJson(output)
  if (!data) return <Error widget="spaces" type="noData" />

  return (
    <div className="simple-bar simple-bar--spaces">
      <Spaces output={data.spaces} SIP={data.SIP} displayId={1} />
    </div>
  )
}

export { command, refreshFrequency, className, render }