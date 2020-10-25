export const createProject = (project) => {
    return (dispatch, getState, getFirebase) => {
      console.log(getFirebase().firestore());
      // make async call to database
      
      const firestore = getFirebase().firestore();
      firestore.collection('projects').add({
        ...project,
        authorFirstName: 'Net',
        authorLastName: 'Ninja',
        authorId: 12345,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
 

    }
  };