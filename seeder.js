const Student = require('./models/studentModel');
const Resource = require('./models/resourceModel');

exports.seedInitialData = async () => {
  try {
    // Seed students
    const student1 = new Student({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1995-05-15'),
      email: 'john.doe@example.com',
    });

    const student2 = new Student({
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1998-10-22'),
      email: 'jane.smith@example.com',
    });

    await student1.save();
    await student2.save();

    // Seed resources
    const studyRoom1 = new Resource({
      name: 'Study Room 1',
      type: 'Study Room',
      capacity: 4,
    });

    const studyRoom2 = new Resource({
      name: 'Study Room 2',
      type: 'Study Room',
      capacity: 6,
    });

    await studyRoom1.save();
    await studyRoom2.save();

    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
};
