import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { Agent } from '../models/agent';
import { LoginAgent } from '../models/loginAgent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  constructor(private agentService: AgentService, private formBuilder: FormBuilder,
  ) { }

  agent: LoginAgent;
  agentAddForm: FormGroup;


  createAgentForm() {
    this.agentAddForm = this.formBuilder.group({
      username: ['', Validators.required],      
      password: ['', Validators.required],
      
      
    });
  }

  ngOnInit() {
    this.createAgentForm();
  }

  login() {
    if (this.agentAddForm.valid) {
      this.agent = Object.assign({}, this.agentAddForm.value);
      this.agentService.login(this.agent);     
      window.alert(this.agent.username+" hoşgeldiniz")
    }
  }

}
