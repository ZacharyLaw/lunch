function getUser() {
    const userEmail = 'zacharylaw@peplink.com';
    try {
      const user = AdminDirectory.Users.get(userEmail);
      //console.log('User data:\n %s', JSON.stringify(user, null, 2));
    } catch (err) {
      console.log('Failed with error %s', err.message);
    }
  }