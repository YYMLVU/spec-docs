export function publicUserProfile(user) {
  return {
    id: user.id,
    displayName: user.displayName
  };
}
