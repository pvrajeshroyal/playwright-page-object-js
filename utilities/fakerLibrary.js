const { faker } = require('@faker-js/faker');

const generateFirstName = () => faker.person.firstName();
const generateLastName = () => faker.person.lastName();
const generateEmail = () => `${Math.floor(Math.random() * 100000000)}-${faker.internet.email()}`;
const generateBirthDate = () => faker.date.birthdate({ min: 1930, max: 1999, mode: 'year' }).toLocaleDateString('en-GB');
const generateFutureDate = () => faker.date.future().toLocaleDateString('en-GB');
const generateGender = () => faker.helpers.arrayElement(['male', 'female', 'other']);
const generateCountryCode = () => faker.helpers.arrayElement(['BE', 'NL', 'FR', 'DE', 'ES', 'GB']);
const generateRelation = () => faker.helpers.arrayElement(['family', 'friend']);

module.exports = {
  generateFirstName,
  generateLastName,
  generateEmail,
  generateBirthDate,
  generateFutureDate,
  generateGender,
  generateCountryCode,
  generateRelation
};
