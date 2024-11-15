package com.Cows_and_Bulls_Game_api.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Scores")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "no_of_guesses", nullable = false)
    private int noOfGuesses;

    @Column(nullable = false)
    private String result;
}
