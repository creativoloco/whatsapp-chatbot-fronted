
type props = {
    type: string
}

export const ButtonEditBar = ({type}: props)=>{
    return (
        <button className='edit-content-bar-button' data-type={type} >
            <img className='button-img' src={`edit-bar-${type}-icon.svg`}/>
            <span className='button-text'>{type}</span>
        </button>
    )
}
