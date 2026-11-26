# Real-Time Chat App

A modern, cross-platform mobile chat application built with **React Native** and **Expo (SDK 58)**. The app supports real-time messaging over a lightweight WebSocket server, offline auto-reply fallback, and rich media sharing via device camera and photo gallery.

---

##  Features

- **Real-Time Messaging**: Connects to a WebSocket server (`ws://localhost:8080`) for live bi-directional message broadcasting between clients.
- **Offline Fallback Mode**: If the WebSocket server is unavailable, the app seamlessly falls back to offline mode with simulated automated replies.
- **Media & Photo Sharing**:
  - **Live Custom Camera** (`RawCameraScreen`): Built with `expo-camera` (`CameraView`) featuring front/rear camera flip, capture shutter, and instant photo review before sending.
  - **Native Camera Launcher** (`CameraScreen`): Takes photos using the native device camera UI with `expo-image-picker`.
  - **Photo Library Picker** (`ImagePickerScreen`): Allows selecting and cropping images from the device gallery.
- **Chats & Contact Management**:
  - Searchable conversations list displaying last messages, timestamps, and avatars.
  - All contacts directory with active online/offline status indicators.
- **Responsive Mobile UI**:
  - Native stack navigation (`@react-navigation/native-stack`).
  - Styled message bubbles differentiating sent vs. received messages.
  - `KeyboardAvoidingView` and auto-scrolling to the latest message.
  - Edge-to-edge layout with `react-native-safe-area-context`.

---

##  Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React Native](https://reactnative.dev/) (0.88.1) / [Expo](https://expo.dev/) (SDK 58) |
| **UI Library** | React 19 |
| **Navigation** | [React Navigation](https://reactnavigation.org/) (Native Stack v7) |
| **Camera & Media** | `expo-camera`, `expo-image-picker`, `expo-file-system` |
| **Real-Time Backend**| Node.js with [`ws`](https://github.com/websockets/ws) (WebSocket) |
| **Language** | JavaScript & TypeScript support |

---

##  Project Structure

```text
chat_app/
├── App.js                      # Root application component & navigation setup
├── app.json                    # Expo configuration & app permissions
├── index.js                    # Entry point registered with Expo
├── server.js                   # Lightweight Node.js WebSocket broadcast server
├── package.json                # Project dependencies and run scripts
├── tsconfig.json               # TypeScript configuration
├── components/
│   └── ChatBubble.jsx          # Reusable chat bubble (text & image rendering)
├── screens/
│   ├── Stack.jsx               # Native stack navigator configuration
│   ├── ConversationScreen.jsx  # Primary chats list screen with search
│   ├── AllUsers.jsx            # Contacts list with status badges
│   ├── ChatScreen.jsx          # Chat room with messaging & media actions
│   ├── CameraScreen.jsx        # Native camera launcher & preview
│   ├── RawCameraScreen.jsx     # Live camera viewfinder (expo-camera)
│   └── ImagePicker.jsx         # Gallery image picker & preview
├── data/
│   └── dummyData.js            # Initial mock users, conversations & messages
└── assets/                     # App icons, splash screens, and images
```

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/go) app on your mobile device (iOS / Android) or a configured simulator / emulator

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd chat_app
npm install
```

### 2. Start the WebSocket Server

In a separate terminal window, start the local WebSocket server:

```bash
npm run server
```

The server will listen at `ws://localhost:8080`.

> **Note for Physical Devices**: When running on a physical phone via Expo Go, open `screens/ChatScreen.jsx` and replace `localhost` in `WS_URL` with your computer's local network IP address (e.g. `ws://192.168.1.X:8080`).

### 3. Start the Expo Development Server

In another terminal window, start Expo:

```bash
npm start
```

- Scan the generated QR code using the **Camera app** (iOS) or **Expo Go app** (Android).
- Press `i` to open in the iOS Simulator.
- Press `a` to open in the Android Emulator.
- Press `w` to open on Web.

---

##  Available Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Starts the Expo development server / Metro bundler |
| `npm run server` | Starts the Node.js WebSocket chat server on port `8080` |
| `npm run android` | Builds and runs the app on an Android device or emulator |
| `npm run ios` | Builds and runs the app on an iOS simulator |
| `npm run web` | Launches the web version of the application |
| `npx expo-doctor` | Validates dependencies and project configuration against Expo SDK |
| `npx tsc --noEmit`| Runs TypeScript type checking |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
