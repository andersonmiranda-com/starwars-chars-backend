## Star Wars Characters - Backend

This is the backend component for a demonstration of Apollo Server pull data from REST API.

It reads characters data from [https://swapi.dev/](https://swapi.dev/) and make it availiable using graphQL queries.

### Instructions

`npm install`

Installs all dependencies.

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

### Query examples

Reads a paginated list of all chacaters for

```
  query charactersList($page: Int) {
    charactersList(page: $page) {
      next
      previous
      characters {
        id
        name
        gender
        birth_year
      }
    }
  }
```

Reads a single character detail

```
query character($charId: ID!) {
    character(id: $charId) {
        id
        name
        height
        mass
        gender
        hair_color
        skin_color
        eye_color
        birth_year
        films
        homeworld
    }
}
```
