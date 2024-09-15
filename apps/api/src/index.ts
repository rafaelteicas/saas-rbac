import { defineAbilityFor } from "@saas/auth";

const ability = defineAbilityFor({ role: "ADMIN", id: "1" });

const userCanInviteSomeone = ability.can("invite", "User");
const userCanDeleteOtherUser = ability.can("delete", "User");

console.log(userCanInviteSomeone);
