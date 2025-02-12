#### Recruify
The recruify project aims to develop a Interview sheduler Management website, leveraging modern technologies to enhance interview scheduling efficiency, and best user experience.

# Recruify - Summary  
Recruify is an interview scheduling and management application designed to streamline the interview process for HR professionals and recruiters. Built with modern technologies, Recruify offers a seamless user experience for scheduling, managing, and tracking interviews efficiently.  

## Core Features  

### 1. Interview Scheduling  
- Schedule interviews with key details:  
  - **Candidate name**  
  - **Interviewer name**  
  - **Date and time slot selection**  
  - **Interview type** (Technical, HR, Behavioral)  
- Check for conflicts and avoid overlapping interviews for the same candidate or interviewer.  
- Support for multiple time zones.  

### 2. Interview Dashboard  
- View all scheduled interviews in a calendar or timeline format using `react-big-calendar`.  
- Filter interviews by **date**, **interviewer**, or **candidate** for easy navigation.  

### 3. Rescheduling and Editing  
- Update interview details like time slot, interviewer, or interview type.  
- Persist changes in **localStorage** or a **mock API** for data consistency.  

### 4. Deleting Interviews  
- Delete scheduled interviews with a confirmation step.  
- Display success or error notifications on scheduling, updating, and deleting interviews.  

---

## Notifications and Alerts  
- Instant feedback through **success/error messages** for user actions like scheduling, rescheduling, or deleting interviews.  

## Responsive Design  
Recruify is fully responsive and optimized for both desktop and mobile devices, ensuring a seamless experience across different screen sizes.  

---

## Technology Stack  
- **React** with functional components and hooks  
- **Zustand** for state management  
- **React Router** for navigation between pages (Dashboard, Schedule Interview, Edit Interview)  
- **Styled-Components** for consistent and modern UI styling  

---

## Bonus Features  
- **Time Zone Handling**: Schedule interviews across different time zones, ensuring clarity for both interviewers and candidates.  
- **Library Integration**: Use `react-big-calendar` for timeline and calendar views.  

# Run the project Process

## Guidelines

1. **Clone the Repository:** Clone the project repository to your local development environment using the following command:
   ```
   git clone https://github.com/MahdiManik/recruify.git
   ```
2. **Run the command:** Open your termonal and run this command:
   ```
   npm i -f
   ```
   or
   ```
   npm install
   ```
3. **Run the project:** For run this project need to run this command
    ```
   npm run dev
   ```
   or
   ```
   npm run start
   ```

<!-- ------------------DEVELOPED BY Mahdi Hasan------------------- -->

Thanks again!
