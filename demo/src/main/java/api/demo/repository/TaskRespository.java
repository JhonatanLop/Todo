package api.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import api.demo.classes.Task;

@RepositoryRestResource
public interface TaskRespository extends JpaRepository<Task, Long>{
    
    @Query(value = "select * from task", nativeQuery = true)
    public List<Task> findAll();

}
