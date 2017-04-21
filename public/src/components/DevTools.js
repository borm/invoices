import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor defaultPosition="left"
               toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={false}
               defaultSize={0.34} >
    <LogMonitor/>
  </DockMonitor>
)
