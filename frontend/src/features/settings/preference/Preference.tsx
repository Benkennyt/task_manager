import './Preference.css'

const Preference = (props: any) => {
    const {openPreferenceSection} = props
  return (
    <div className={openPreferenceSection === 'true' ? "preference-settings-container settings-show" : openPreferenceSection === 'false' ? "preference-settings-container settings-hide" : 'inactive-section'}>
        <div className="preference-settings-container-1">
            <div className="language preference-select">
                <h5>Change language</h5>
                <button className=" language options"><p>English</p> </button>
            </div>
            <div className="region preference-select">
                <h5>Select region</h5>
                <button className=" language options"><p>English</p> </button>
            </div>
            <div className="disable-chats disable">
                <h5>Disable chats</h5>
                <input type="checkbox" />
            </div>
        </div>
    </div>
  )
}

export default Preference