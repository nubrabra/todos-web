# **Todo List Application**

![Project Status](https://img.shields.io/badge/Status-Completed-green)  
A clean and scalable **Todo List Application** built with **Next.js**, **Redux Toolkit**, **Material-UI (MUI)**, and **React Hook Form**, ensuring responsiveness and usability across all devices.

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)
9. [License](#license)

---

## **Features**

- ✅ **Add New Todos**: Form validation (title up to 256 characters, numeric user ID).
- ✅ **Update Status**: Mark todos as completed or uncompleted.
- ✅ **Delete Todos**: Remove unwanted todos.
- ✅ **Pagination & Search**: Search todos by user ID and paginate results.
- ✅ **Responsive Design**: Fully responsive UI using Material-UI.
- ✅ **State Management**: Redux Toolkit for scalable state management.
- ✅ **Error Handling & Loading States**: Smooth user experience with proper handling.
- ✅ **Unit Tests**: Comprehensive testing using Jest and React Testing Library.

---

## **Tech Stack**

- **Frontend**: Next.js, React.js, MUI (Material-UI)
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Testing**: Jest, React Testing Library
- **API**: [DummyJSON Todos API](https://dummyjson.com/docs/todos)

---

## **Getting Started**

### **Prerequisites**

- Node.js >= 18.18.0
- npm or yarn

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/nubrabra/todos-web.git
   cd todos-web
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=https://dummyjson.com/todos
   ```

4. Run the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Project Structure**

```
src/
│
├── components/          # Reusable UI components
│   ├── Layout/          # Page layout wrapper
│   └── Todo/            # Todo components (TodoList, TodoItem, TodoForm)
│
├── pages/               # Next.js pages
│   └── index.js         # Home page
│
├── services/            # API calls (Mock API integration)
│   └── todoService.js
│
├── store/               # Redux setup
│   ├── slices/          # Redux slices
│   └── index.js         # Root store
│
├── helpers/             # Utility functions
├── theme.js             # MUI Theme setup
│
__tests__/           # Unit tests
├── components/      # Tests for components
├── helpers/         # Tests for helper functions
├── store/           # Tests for Redux slices
│
public/              # Static assets
```

---

## **Usage**

### **Add a New Todo**

1. Click the "New Todos" button.
2. Fill out the form:
   - **Todo**: Description of the task (required, max 256 characters).
   - **User ID**: Numeric ID (required, up to 8 digits).
3. Click "Add" to save the task.

### **Mark as Completed/Uncompleted**

- Click the "More" icon next to a task and select **Mark as completed** or **Mark as uncompleted**.

### **Delete a Todo**

- Click the "More" icon and choose **Delete**.

### **Search by User ID**

- Use the search bar to filter tasks by User ID.

### **Pagination**

- Navigate between pages using the pagination controls.

---

## **Testing**

Run unit tests using Jest and React Testing Library:

```bash
yarn test
# or
npm run test
```

To view the test coverage report:

```bash
yarn test --coverage
```

---

## **Screenshots**

### **Home Page**

![Home Page](https://drive.google.com/u/0/drive-viewer/AKGpihZCT7BYvz5PYw85um3C0EK-U-aNGLt-TalnlFpPmvmCISVSxTOnzzTTWhVMy0iTk55hCCvfHB-FTLwWTTSjCxZOzObgoYg4qJk=s1600-rw-v1)

### **Add Todo Form**

![Add Todo](https://drive.google.com/u/0/drive-viewer/AKGpihYHLwZ1Rx62UnNffK_QyQd-bbw4WXPB49grBb0A_KJWIhO1BvAqiVYzd_3X2HXQN68tvL_ieQTaWheSwzsdF6sv_p4HG49jQ2o=s1600-rw-v1)

### **Responsive Design**

![Mobile View](https://drive.google.com/u/0/drive-viewer/AKGpihbe8nUCFj7pPPSzL8QD3HWh7lGpFMESF_7X6jFOvK3rOlznm7yGNJMAt1l-I_AhENpgKX4Z9t4r11XqQmfVGQVR0EKwzTwn_mU=s1600-rw-v1)(https://drive.google.com/u/0/drive-viewer/AKGpihY0qDXioSD0Z5fR9djaHfeHEG5qveEs_TwtPvu68NrIwEwiiB_Ou0iLk77fspjz6l74mx7_Btx0egrrBl_8RpKivU4hdgjUSIM=s1600-rw-v1)

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Enjoy building! 🚀**
