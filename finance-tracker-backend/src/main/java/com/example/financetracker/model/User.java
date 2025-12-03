package com.example.financetracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "person")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User extends BaseEntity {
    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private UserCredentials userCredentials;

    @OneToMany(mappedBy = "user")
    private List<UserAccount> userAccounts;

    @OneToMany(mappedBy = "inviter")
    private List<AccountInvitation> accountInvitationInviter;

    @OneToMany(mappedBy = "invitee")
    private List<AccountInvitation> accountInvitationInvitee;

    @OneToMany(mappedBy = "owner")
    private List<Account> accounts;
}
