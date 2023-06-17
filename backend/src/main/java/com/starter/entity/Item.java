package com.starter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

@Data
@Entity
@Table(name = "item", schema = "public")
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue
    @Column(name = "_id")
    private Long id;
    private String name;
    private String description;
    private Double price;
    private boolean availability;
    private String location;
    @Column(name = "date_posted")
    private Date datePosted;
    @Lob
    @JdbcTypeCode(SqlTypes.BINARY)
    private byte[] imageUrl = null;
    @Column(name = "user_id")
    private Long userId;
}
