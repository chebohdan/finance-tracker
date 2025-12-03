package com.example.financetracker.specifictation;

import com.example.financetracker.model.AccountInvitation;
import org.springframework.data.jpa.domain.Specification;

public class AccountInvitationSpecifications {
    private AccountInvitationSpecifications (){

    }
    public static Specification<AccountInvitation> accountIdEquals(Long accountId) {
        return (root, query, cb) -> cb.equal(root.get("account").get("id"), accountId);
    }

    public static Specification<AccountInvitation> inviterIdEquals(Long userId) {
        return (root, query, cb) -> cb.equal(root.get("inviter").get("id"), userId);
    }

    public static Specification<AccountInvitation> inviteeIdEquals(Long userId) {
        return (root, query, cb) -> cb.equal(root.get("invitee").get("id"), userId);
    }
}
