# ecampus-hub

### Commands

1. Run the Application
   ```
   npm install &&
   npm run start
   ```
**Note :** Server started @ 'localhost:3000'.

2. Add a 'constants.json' file to src/common directory. ex.
    ```
    {
      "GOOGLE_OAUTH2_API": "https://accounts.google.com/o/oauth2/v2/auth",
      "GOOGLE_OAUTH2_REDIRECT_URL": <...>,
      "GOOGLE_DRIVE_UPLOAD_FILE_API": "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
      "GOOGLE_USER_INFO_API": "https://www.googleapis.com/oauth2/v3/userinfo",
      "GOOGLE_TOKEN_INFO_API": "https://www.googleapis.com/oauth2/v3/tokeninfo",
      "GOOGLE_DRIVE_FILES_API": "https://www.googleapis.com/drive/v3/files",
      "GOOGLE_DRIVE_PUBLIC_URL": "https://drive.google.com/uc?export=view&id=",
      "GOOGLE_CLIENT_ID": <...>,
      "GOOGLE_CLIENT_SECRET": <...>,
      "GOOGLE_API_KEY": <...>,
      "GOOGLE_API_SCOPES": "profile email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata",
      "GOOGLE_DISCOVERY_DOCS": [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
      ],
      "VUFORIA_API": "https://vws.vuforia.com",
      "VUFORIA_SERVER_ACCESS_KEY": <...>,
      "VUFORIA_SERVER_SECRET_KEY": <...>
    }
    ```