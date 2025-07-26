// lib/subscription.js
export function isSubscriptionActive(user) {
  if (!user.subscriptionEndDate) return false;
  return new Date(user.subscriptionEndDate) > new Date();
}

export function canAccessPremiumContent(user) {
  return (
    user.subscriptionStatus !== 'FREE' && 
    isSubscriptionActive(user)
  );
}