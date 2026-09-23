import {X, CheckCircle2, CheckCircle, XCircleIcon} from 'lucide-react'

import { useState } from 'react';

export default function UploadProgress({status, uploadState, onSetModal}){
    
    const handleClick = () => {
        onSetModal(false);
    }
    const uploadName = uploadState.name;
    const formatedName=  uploadName.slice(0, 20)
    
    return (
        <div className="uplcontainer">

        

          <div  className='lucideIconStyle' onClick={handleClick}>
              <X color='white' size="30"  />
          </div>

        <div className='uplstat'>
            <div className="statMessage">
                {status === "Success" && (<div className="success">
                    <div className="lucIco">
                        <CheckCircle color='chartreuse' size={50}></CheckCircle>
                    </div>
                    <div className="message">Successfully uploaded {uploadState.totalFiles} files</div>
                </div>)}
                    {status === "Error" && (<div className="error">
                    <div className="lucIco">
                        <XCircleIcon color='red' size={50}></XCircleIcon>
                    </div>
                    <div className="message">An Error Occured</div>
                </div>)}



            </div>
          
            {status === "Uploading file(s)..." && (<div className="uplPro">
              <div>
                {uploadState.uploaded} of {uploadState.totalFiles}
              </div>
              <div>{formatedName}...</div>
              <div className="progressBar">
                <div
                  className="bar"
                  style={{ width: uploadState.percent + "%" }}
                ></div>
              </div>
              <div className="percentage">Uploading {uploadState.totalFiles} file(s)</div>
            </div>)}
        </div>
          
          
        </div>
    )
}
