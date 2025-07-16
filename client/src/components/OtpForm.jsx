import React from 'react'

const OtpForm = ({ inputRefs }) => {

    const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1 ){
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }
    return (
        <div className='d-flex justify-content-between gap-2 mb-4' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
                <input type='text' maxLength='1' key={index} required
                    className='w-50 h-25 bg-custom-dark border-0 text-white p-3 fs-4 text-center rounded-3'
                    ref={e => inputRefs.current[index] = e}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)} />
            ))}
        </div>
    )
}

export default OtpForm