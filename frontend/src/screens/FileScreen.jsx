import React from "react";
import File from "../components/FolderFile/File";
import file from "../components/FolderFile/FileJSON";
import { useEffect } from "react";
import apiFiles from "../api/files";

function FileScreen() {
    async function uploadFiles(files) {
        const fileTypes = {
            'txt' : 1,
            'xlsx': 2,
            'docx': 3,
        };
        const request = new FormData();
        for (const file of files) {
            request.append('files', {
                file: file,
                fileType: fileTypes[file.name.split('.').pop()]
            })
            console.log({
                file: file,
                fileType: fileTypes[file.name.split('.').pop()]
            });
        }
        try {
            const response = await apiFiles.upload(request);
            const data = response.data;
            console.log(data)
        } catch (error) {
            console.error(error);
            console.error('ERROR UPLOAD FILES');
        }
    }

    useEffect(async () => {
        try {
            const response = await apiFiles.getList();
        } catch(error) {
            console.error(error);
            console.error('ERROR GET FILES');
        }
    }, []);

  return (
    <div>
      <div className='title'>Мои файлы</div>
      <div className='fail-folder'>
          <div className='folder'>
              <div
                  style={{fontSize: '13px', textAlign: 'center', position: 'relative'}}
                  className="file-link"
              >
                  <input
                      type="file"
                      id="file"
                      multiple={true}
                      style={{position: 'absolute', opacity: '0', width: '100%', height: '100%'}}
                      onChange={(e) => uploadFiles(e.target.files)}
                  />
                  <img src='./images/file.png' alt='1'/>
                  <p>Загрузить файлы</p>
              </div>
              {file.map((file, index) => (
                  <File file={file} key={index}/>
              ))}
          </div>
      </div>
    </div>
  );
}

export default FileScreen;
