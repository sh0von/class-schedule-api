## Course Schedule Management API

### IDEA

- A simple API to manage courses, instructors, departments, and batches for universities or educational institutions.
- The API allows the creation, updation, and deletion of courses, instructors, departments, and batches.
- The API also allows the retrieval of courses based on various parameters like instructor, department, batch, day, and time.
- The API also allows the registration and login of users with an API key for authentication.(Registration requires a code provided by the authority)


### API Endpoints

#### Instructor

- `GET /instructors`
- `POST /instructors`
    ```json
    {
      "name": "example_instructor_name"
    }
- `PUT /instructors/:id`
- `DELETE /instructors/:id`

#### Department

- `GET /departments`
- `POST /departments`
    ```json
    {
      "name": "example_department_name"
    }
- `PUT /departments/:id`
- `DELETE /departments/:id`

#### Batch

- `GET /batches`
- `POST /batches`
    ```json
    {
      "name": "example_batch_name"
    }
- `PUT /batches/:id`
- `DELETE /batches/:id`

#### Course

- `GET /courses`
  - Query Parameters:
    - `instructorId`
    - `departmentId`
    - `batchId`
    - `day`
    - `time`
  ```json
    {
      "instructorId": "example_instructor_id",
      "departmentId": "example_department_id",
      "batchId": "example_batch_id",
      "day": "example_day",
      "time": "example_time"
    }
    ```
- `POST /courses`
    ```json
    {
      "name": "example_course_name",
      "instructor": "example_instructor_id",
      "department": "example_department_id",
      "batch": "example_batch_id",
      "time": "example_time",
      "day": "example_day"
    }
    ```
- `PUT /courses/:id`
- `DELETE /courses/:id`

### Procedure

1. Start by creating Instructors, Departments, and Batches.
2. Then, proceed to create Courses with relevant details and id of the Instructor, Department, and Batch.

### Authentication

- All GET operations are public.
- Authentication is required for every POST, PUT, and DELETE operation using an API key generated during registration.
- Access the API with:
  ```json
  Authorization: Bearer KEY
  ```
- Registration or login requires a code provided by the authority.

### Registration and Login

- Upon registration, an email with the API key will be sent.
- Utilize the email, API key, and provided code for login.

#### Methods:

- `POST /account/register`
    ```json
    {
      "email": "example@example.com",
      "code": "your_secret_code"
    }
    ```

- `POST /account/login`
    ```json
    {
      "email": "user@example.com",
      "apiKey": "user_api_key",
      "code": "your_secret_code"
    }
    ```


### Logging

- Log every API call for tracking purposes.
- Method:
  - `GET /logs`
  - Query Parameters:
    - `count=true/false`
