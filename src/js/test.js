var obj = {
  one: {
    fname: 'Vishal',
    lname: 'Chandola'
  },
  two: {
    fname: 'Gulshan',
    lname: 'kumar'
  },
  three: {
    fname: 'Vishal',
    lname: 'Chandola'
  },
  four: {
    fname: 'Vishal',
    lname: 'Chandola'
  }
}

const test = ({ one }) => {
  return `Hi <strong>${one.fname} ${one.lname}</strong> how are you doing?`;
};

$(function() {
  $('header').html(test(obj))
})

