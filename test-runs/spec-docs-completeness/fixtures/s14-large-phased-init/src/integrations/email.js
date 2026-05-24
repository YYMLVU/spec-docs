export function buildWelcomeEmail(user) {
  return {
    to: user.email,
    subject: "Welcome",
    body: `Hello ${user.displayName}`
  };
}
