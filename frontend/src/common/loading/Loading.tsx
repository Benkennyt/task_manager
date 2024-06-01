import './Loading.css'

const Loading = () => {

  return (
    <div className='loading-overlay'>
        <div className="lds-dual-ring"></div>
        <div className="lds-dual-ring-2"></div>
    </div>
  )
}

export default Loading