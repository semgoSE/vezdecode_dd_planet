import { AdaptivityProvider, AppRoot, Button, Card, ConfigProvider, Div, FormItem, FormLayout, Input, Panel, PanelHeader, ScreenSpinner, Textarea, Title, View, WebviewType } from "@vkontakte/vkui";
import InputMask from 'react-input-mask';
import React from "react";
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import axios from "axios";
import { Icon56DurationOutline } from "@vkontakte/icons";
import Admin from "./panels/Admin";


class App extends React.Component {
  state = {
    globState: {
      form: {

      },
      alredy: false,
    },
    activePanel: "appeal",
    popout: null
  }

  componentDidMount() {
    if(window.location.hash === "#admin") {
      this.setState({ activePanel: "admin", popout: <ScreenSpinner /> });
      axios.get("http://localhost:4000/get_appeals").then(({ data }) => {
        console.log(data)
        
        this.setGlobState({ appeals: data.appeals.map((d) => ({ ...d, id: d.appeal_id })) })
        this.setPopout(null)
      })
    }
  }

  setPopout = (popout) => {
    this.setState({ popout })
  }

  setGlobState = (e) => {
    const { globState } = this.state;
    this.setState({ globState: {
      ...globState,
      ...e
    }})
  } 

  onChange = (e) => {
    const { name, value } = e.target;
    const { globState } = this.state;
    this.setGlobState({
      form: {
        ...globState.form,
        [name]: value
      }
    })
  }

  save = () => {
    const { globState } = this.state;
    console.log(globState)
    axios.post("http://localhost:4000/save_appeal", globState.form).then((data) => {
      console.log(data)
      this.setGlobState({ alredy: true })
    })
  }

  render() {
    const { activePanel, globState, popout } = this.state;
    const { form, alredy } = globState;
    const { name, tel, text } = form;
    return(
      <ConfigProvider isWebView={WebviewType.VKAPPS}>
        <AdaptivityProvider>
          <AppRoot>
            <View activePanel={activePanel} popout={popout}>
              <Panel id="appeal">
                <PanelHeader>?????????? ??????????????????</PanelHeader>
                
                <div className="card">
                  {!alredy ? <div className="form">
                    <Card>
                      <FormLayout>
                        <FormItem top="??????">
                          <Input value={name} name="name" onChange={this.onChange} />
                        </FormItem>
                        <FormItem top="?????????? ????????????????">
                          <InputMask value={tel} onChange={this.onChange} name="tel" mask="+7 (999) 999 99 99">
                            {(props) => <Input {...props} type="tel" />}
                          </InputMask>
                        </FormItem>
                        <FormItem top="??????????????????">
                          <Textarea value={text} name="text" onChange={this.onChange} />
                        </FormItem>

                        <FormItem>
                          <Button disabled={!name || !tel || !text} stretched size="l" onClick={this.save}>??????????????????</Button>
                        </FormItem>
                      </FormLayout>
                    </Card>
                  </div>: 
                    <div className="form">
                      <Card>
                        <Div align="center">
                          <Icon56DurationOutline fill="var(--accent)" />
                          <Title level="2" weight="heavy">?????????????? ???? ??????????????????</Title>
                          <Button mode="tertiary" onClick={() => {
                            this.setGlobState({ alredy: false, form: {} })
                          }}>?????????????? ?????? ???????? ???????????????????</Button>
                        </Div>
                      </Card>
                    </div>
                  }
                </div>
              </Panel>

              <Admin 
                id="admin"
                appeals={globState.appeals}
              />
            </View>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    )
  }
  
}

export default App;
