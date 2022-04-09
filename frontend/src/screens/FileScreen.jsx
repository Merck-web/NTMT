import React from "react";
import Folder from "../components/FolderFile/Folder";
import File from "../components/FolderFile/File";
import folder from "../components/FolderFile/FolderJSON";
import file from "../components/FolderFile/FileJSON";

function FileScreen() {
  return (
    <div>
      <div className='title'>Мои файлы</div>
      <div className='fail-folder'>
        <div className='folder'>
          {folder.map((folder, index) => (
            <Folder folder={folder} key={index} />
          ))}
          {file.map((file, index) => (
            <File file={file} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileScreen;
