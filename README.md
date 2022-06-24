# GITPeel.io 💻

An app that connects to the Github API and displays all of a user's public repositories, and the latest commits for the repositories.

Check out the [Demo](https://gitpeel-io.vercel.app/)

## Introduction

1. Connects to the Github REST-Api
2. Shows a list off all trending users
3. Can search on username
4. If clicked on a user: show a detail view of all public repositories
5. Each repo has and detail page with al the commits

## how to run localy

1. Clone this repo
2. `npm i`
3. create .env file with your github token (check .env.example)
4. `npm run dev`

## how to test localy

1. `npm test`

## ES6 Features

### Destructuring Assignment

This is really handy when you want to get an variable from an external source:

```
// before es6
const id = data.id;

// after es6
const {id} = data
```

### Template Literals

I use this a lot when preparing data to show to the user with extra text and variables

```
// before es6
return 'You are' + age + 'old'

// after es6
return `You are ${age} old`
```

### Spread operator

This is mostly used when you work with data that already exists and you want to exend or edit it.

```
// before es6
payload.age = 16;
payload.name = 'Aaron Israel'
payload.job = 'Front-end Engineer'

return payload;

// after es6
const extra = {
    age: 16,
    name: 'Aaron Israel',
    job: 'Front-end Engineer'
}

return {
  ...payload,
  ...extra
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
