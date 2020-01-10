function parcer(users, output){
    users.forEach(user => {
        const month = new Date(user.dob).getMonth();
    output[month].users.push(user.firstName + ' ' + user.lastName);
});

    return output;
}

function getColor(users) {
    const colors = {
        2: '#999',
        6: '#00a',
        10: '#0a0'
    };
    const maxColor = '#a00';
    let color = maxColor;

    Object.keys(colors).some((count) => {
        if (users.length <= count) {
        color = colors[count];
        return true;
    }
    return false;
});

    return color;
}

document.addEventListener("DOMContentLoaded", function(event) {
    let site = new Vue({
        el: '.content',
        data: {
            dataUrl: 'https://yalantis-react-school.herokuapp.com/api/task0/users',
            monthes: ["January","February","March","April","May","June","July", "August","September","October","November","December"],
            mainContent: [],
            showed: [],
            shift: 0
        },
        methods: {
            loadData(){
                axios.get(this.dataUrl)
                    .then(result => {
                    this.mainContent = this.monthes.map((monthName) => {
                    return {name: monthName, users: []};
            })
                parcer(result.data, this.mainContent);
            })
            },
            showUsers(users, index){
                this.showed = users;
                this.shift = index;
            },
            hideUsers(users){
                this.showed = [];
            }
        }
    })
});
