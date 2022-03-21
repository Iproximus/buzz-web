import axios from "axios";
const KEYS = {
    users: 'users',
    userId: 'userId'
}

// export function getAllUsers() {
//     axios.get('http://localhost:2552/api/users/listAll')
//         .then((res) => res.json())
//         .then((resData) => {
//             console.log(resData);
//             let users = JSON.parse(resData)
//             return users;
//         })
//         .catch(error => console.warn(error));
// }

// export function insertUser(data) {
//     console.log(data)
//     axios.post('http://localhost:2552/api/users/addUser', this.user)
//         .then((res) => {
//             console.log(res.data);
//             this.res({ users: res.data });
//         }).catch((err) => {
//             console.log(err);
//         })
// }

// export function updateUser(data) {
//     console.log(data)
//     axios.patch('http://localhost:2552/api/users/updateUser/:_id', this.user)
//         .then((res) => {
//             console.log(res.data);
//             this.res({ users: res.data });
//         }).catch((err) => {
//             console.log(err);
//         })
// }

export function deleteUser(_id) {
    console.log(_id)
    axios.delete('http://localhost:2552/api/users/deleteUser/:_id')
        .then((res) => {
            console.log(res.data);
            this.res({ users: res.data });
        }).catch((err) => {
            console.log(err);
        })
}

// export function insertUser(data) {
//     let users = getAllUsers();
//     data['id'] = generateUserId()
//     users.push(data)
//     localStorage.setItem(KEYS.users, JSON.stringify(users))
// }

// export function updateUser(data) {
//     let users = getAllUsers();
//     let recordIndex = users.findIndex(x => x.id === data.id);
//     users[recordIndex] = {...data }
//     localStorage.setItem(KEYS.users, JSON.stringify(users));
// }

// export function deleteUser(id) {
//     let users = getAllUsers();
//     users = users.filter(x => x.id != id)
//     localStorage.setItem(KEYS.users, JSON.stringify(users));
// }

// export function generateUserId() {
//     if (localStorage.getItem(KEYS.userId) == null)
//         localStorage.setItem(KEYS.userId, '0')
//     var id = parseInt(localStorage.getItem(KEYS.userId))
//     localStorage.setItem(KEYS.userId, (++id).toString())
//     return id;
// }

export function getAllUsers() {
    if (localStorage.getItem(KEYS.users) == null)
        localStorage.setItem(KEYS.users, JSON.stringify([]))
    let users = JSON.parse(localStorage.getItem(KEYS.users));
    return users;
}