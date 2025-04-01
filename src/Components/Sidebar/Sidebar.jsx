import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Sidebar = () => {
    const [extend, setextend] = useState(false)
    const { prevPrompts, onSent, setrecentPrompt,newChat } = useContext(Context)
    const loadprom=async (prompt)=>{
        setrecentPrompt(prompt)
        await onSent(prompt);
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setextend(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extend ? <p>New Chat</p> : null}
                </div>
                {extend ?
                    <div className="recent">
                        <div className="recent-title">Recent</div>
                        {prevPrompts.map((item, index)=>{
                    return (
                        <div onClick={()=>loadprom(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)} ...</p>
                        </div>
                        )
                })}

                    </div>
                    : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extend ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extend ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extend ? <p>Settings</p> : null}
                </div>

            </div>

        </div>
    )
}

export default Sidebar
