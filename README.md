# reimbursement-client

This is a simple tool for logging traveling expenses. This repository makes up the frontend, and is completed by michaelsohl/reimbursement-server
to work properly.

### To install (for all environments)
- Node.js (https://nodejs.org/en/download/)
- react-native-cli (npm install --global react-native-cli)

### To install and run this project, the following list is required (for MAC OS):
```
- xcode
- watchman
```

### To install (for Android)
```
- Android studio (https://developer.android.com/studio/)
- Java 8 (later versions not supported yet) https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

Set Java home variable (preferably in Environment settings)
Windows:
set JAVA_HOME=C:\java\jdk1.8.0_181
Linux:
export JAVA_HOME=/opt/java/jdk8

Add adb to PATH
Windows:
set path=C:\Users\Team-User\AppData\Local\Android\Sdk\platform-tools;%path%
Linux:
export PATH=/sdk/path:$PATH
```

### The following parts should work regardless of which platform you are running.

```
git clone https://sylog-ost@bitbucket.org/sylog-ost/reimburst-client.git
```
&&
```
npm install
```
Run the project with 
```
react-native run-ios (or run-android)
```
