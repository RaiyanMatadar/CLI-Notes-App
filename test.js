const notes = [
  {
    id: "32568a3d-575d-468b-8a80-cd3762917d58",
    noteText: "buy groceries",
    createdAt: "2026-08-02T13:17:54.424Z"
  },
  {
    id: "b24802f9-eed7-444c-9832-0a6f2e6472e5",
    noteText: "this is second note",
    createdAt: "2026-08-02T13:18:12.566Z"
  },
  {
    id: "b24802f9-eed7-444c-9832-0a6f2e6472e5",
    noteText: "this is second note",
    createdAt: "2026-08-02T13:18:12.566Z"
  },
  {
    id: "b24802f9-eed7-444c-9832-0a6f2e6472e5",
    noteText: "this is second note",
    createdAt: "2026-08-02T13:18:12.566Z"
  }
];

let id = 1

// notes.forEach((note, index) => {

//   if (id === index) {

//   }

// })

const newArray = notes.find((note, index) => index == id)