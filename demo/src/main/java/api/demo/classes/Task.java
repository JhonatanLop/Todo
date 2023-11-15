package api.demo.classes;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "task")
@Table(name = "task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Column(name = "tsk_id")
    private long id;
    @Column(name = "tsk_name")
    private String name;
    @Column(name = "tsk_description")
    private String description;
    @Column(name = "tsk_due_date")
    private Date dueDate;
    @Column(name = "tsk_completed")
    private boolean completed;
}
