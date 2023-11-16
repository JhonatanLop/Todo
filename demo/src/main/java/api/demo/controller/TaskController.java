package api.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.demo.classes.Task;
import api.demo.repository.TaskRespository;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired private final TaskRespository taskRespository;

    public TaskController(TaskRespository taskRespository){this.taskRespository = taskRespository;}

    @GetMapping
    public List<Task> getAllTask() {
        return taskRespository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskRespository.save(task);
    }

    // @PostMapping
    // public void cadastrarTask(@RequestBody Task task){
    //     System.out.println(task.getName());
    // }
}
