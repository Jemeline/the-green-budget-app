# the-green-budget-app

## API Documentation

### 1. Users
#### 1.1 Create
- Use: Add a new user
- Endpoint: `/api/users/create-user`
- Parameters: email, lastname, firstname, password
- Example Payload:
```
{
  "email":"test2@test3.com",
  "password":"test1test2test3",
  "firstname":"Test3",
  "lastname":"Test3"
}
```
- Example Response:
```
{
  "message": "success",
    "data": {
        "username": "test2@test3.com",
        "email": "test2@test3.com",
        "firstname": "Test3",
        "lastname": "Test3"
     },
     "id": 5
}
```
#### 1.2 Read
- Use: Lookup a single user by email
- Endpoint: `/api/users/read-user`
- Parameters: email
- Example Payload:
```
{
  "email":"test2@test3.com"
}
```
- Example Response:
```
{
  "message": "success",
    "data": {
        "username": "test2@test3.com",
        "email": "test2@test3.com",
        "firstname": "Test3",
        "lastname": "Test3"
     },
     "id": 5
}
```
#### 1.3 Update
- Use: Update a user's password, firstname, or lastname
- Endpoint: `/api/users/update-user`
- Parameters: email, firstname(optional),lastname(optional),password(optional)
- Example Payload:
```
{
  "email":"test2@test2.com",
  "lastname":"Test2",
  "password":"222"
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "email": "test2@test2.com",
    "lastname": "Test2"
  }
}
```
#### 1.4 Delete
- Use: Deletes a user
- Endpoint: `/api/users/delete-user`
- Parameters: email
- Example Payload:
```
{
  "email":"test2@test2.com",
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "email": "test2@test2.com"
  }
}
```
#### 1.5 Validate
- Use: Validates user for Login
- Endpoint: `/api/users/validate-user`
- Parameters: email, sessionUser, password
- Example Payload:
```
{
  "sessionUser":"test@email.com",
  "email":"test@email.com",
  "password":"12345678"
}
```
- Example Response:
```
{
  "message": "success",
    "data": {
      "id": 3,
      "email": "test@email.com",
      "firstname": "Test",
      "lastname": "Test",
      "isAdmin": 0
    }
}
```
### 2. Expenses
#### 2.1 Create
- Use: Add a new expense
- Endpoint: `/api/expenses/create-expense`
- Parameters: sessionUser, email, date, category, subcategory, description, amount
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "email":"jada_pfeiffer@email.com",
  "date":"2019-10-10",
  "category":"Social",
  "subcategory":"Dining",
  "description":"Date Night",
  "amount":20.20
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
      "email": "jada_pfeiffer@email.com",
      "year": 2020,
      "month": 8,
      "day": 3,
      "category":"Social",
      "subcategory":"Dining",
      "description": "Date Night",
      "amount": 20.2
  },
  "id": 2
}
```
#### 2.2.1 Read
- Use: Lookup single expense by ID
- Endpoint: `/api/expenses/read-expense`
- Parameters: sessionUser, expenseID
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "expenseID":1
}
```
- Example Response:
```
{
  "message": "success",
  "data": [{
    "id": 1,
    "email": "admin@email.com",
    "date":"2019-10-10",
    "category": "social",
    "subcategory":"Dining",
    "description": "Root Cellar",
    "amount": 25.25
   }]
}
```
#### 2.2.2 Read
- Use: Read all expenses associated with user
- Endpoint: `/api/expenses/read-expenses`
- Parameters: sessionUser, expenseUser
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "expenseUser":"admin@email.com"
}
```
- Example Response:
```
{
  "message": "success",
  "data": [{
    "id": 1,
    "email": "admin@email.com",
    "date":"2019-10-10",
    "category": "social",
    "subcategory":"Dining",
    "description": "Root Cellar",
    "amount": 25.25
  }]
}
```
#### 2.3 Update
- Use: Update an expense by ID
- Endpoint: `/api/expenses/update-expense`
- Parameters: sessionUser, expenseID, date(optional), category(optional), subcategory(optional), description(optional), amount(optional)
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "expenseID":8,
  "date":"2019-10-10",
  "amount":1.01
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "expenseID": 8,
    "date":"2019-10-10",
    "amount": 1.01
  }
}
```
#### 2.4 Delete
- Use: Deletes an expense
- Endpoint: `/api/expenses/delete-expense`
- Parameters: sessionUser, expenseID
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "expenseID":1
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "expenseID": 2
  }
}
```

### 3. Income
#### 3.1 Create
- Use: Add a new income
- Endpoint: `/api/income/create-income`
- Parameters: sessionUser, email, date, category, description, amount
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "email":"jada_pfeiffer@email.com",
  "date":"2019-10-10",
  "category":"Wages/Salary",
  "description":"Apple Paycheck 2",
  "amount":2100.12
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "email": "jada_pfeiffer@email.com",
    "date":"2019-10-10",
    "category":"Wages/Salary",
    "description":"Apple Paycheck 2",
    "amount":2100.12
    },
    "id": 2
}
```
#### 2.2.1 Read
- Use: Lookup single income by ID
- Endpoint: `/api/income/read-income`
- Parameters: sessionUser, incomeID
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "incomeID":1
}
```
- Example Response:
```
{
  "message": "success",
  "data": [{
    "id": 6,
    "email": "jada_pfeiffer@email.com",
    "date": "2019-10-10",
    "category": "Wages/Salary",
    "description": "Apple Paycheck 2",
    "amount": 2100.12
  }]
}
```
#### 2.2.2 Read
- Use: Read all income associated with user
- Endpoint: `/api/income/read-incomes`
- Parameters: sessionUser, incomeUser
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "incomeUser":"jada_pfeiffer@email.com"
}
```
- Example Response:
```
{
  "message": "success",
  "data": [{
    "id": 6,
    "email": "jada_pfeiffer@email.com",
    "date": "2019-10-10",
    "category": "Wages/Salary",
    "description": "Apple Paycheck 2",
    "amount": 2100.12
   }]
}
```
#### 2.3 Update
- Use: Update an income by ID
- Endpoint: `/api/income/update-income`
- Parameters: sessionUser, incomeID, date(optional), category(optional), description(optional), amount(optional)
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "incomeID":8,
  "date":"2019-10-10",
  "amount":100.01
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "incomeID": 8,
    "date":"2019-10-10",
    "amount": 100.01
  }
}
```
#### 2.4 Delete
- Use: Deletes an income
- Endpoint: `/api/income/delete-income`
- Parameters: sessionUser, incomeID
- Example Payload:
```
{
  "sessionUser":"jada_pfeiffer@email.com",
  "incomeID":1
}
```
- Example Response:
```
{
  "message": "success",
  "data": {
    "incomeID": 2
  }
}
```

### Authorization
The API uses JWT Tokens for authorization
#### Obtaining a token
- Use: Generate a JWT token
- Endpoint: `/api/generate-token`
- Parameters: user
- Example Payload:
```
{
  "user":"jada_pfeiffer@email.com",
}
```
- Example Response:
```
{
  "message": "success",
  "token": "eyJhbGciOi..."
}
```
#### Using a token
All endpoints are protected by JWT tokenization. To use an endpoint the "sessionUser" parameter of the endpoint and the token "user" paremeter must match. The token should be passed as a header during any API call.
```
"Authorization: "Bearer {JWT Token Here}"
```
### Error Responses
A failed request return one of the following errors
1. 400 => Invalid Parameter or DB error
2. 401 => JWT Auth Error
3. 500 => Generic error
