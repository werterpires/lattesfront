import { Component, Input } from '@angular/core'
import { CurriculumnsService } from '../services/curriculumns.service'
import { AddCurriculumsComponent } from '../add-curriculums/add-curriculums.component'
import { NgClass, NgIf } from '@angular/common'
import { Router } from '@angular/router'
import { IUserFromJwt } from './types'

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [AddCurriculumsComponent, NgIf, NgClass],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  add = false
  user!: IUserFromJwt
  @Input() head = true

  constructor(
    private readonly curriculumService: CurriculumnsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (this.curriculumService.curriculumnsObject.value.length === 0) {
      this.curriculumService.getAllCurriculumns().subscribe()
    }

    if (typeof localStorage === 'undefined') {
      console.error('LocalStorage is not defined.')
      return
    }
    const accesstoken = localStorage.getItem('accessToken')
    if (accesstoken) {
      // pegar o usuário a partir do jwt token
      const token = accesstoken.split('.')[1]
      const usuario = JSON.parse(
        atob(token.replace(/-/g, '+').replace(/_/g, '/'))
      )
      this.user = usuario
    }
  }

  redirect(route: string) {
    this.router.navigate([route])
  }

  logout() {
    localStorage.removeItem('accessToken')
    this.router.navigate(['login'])
  }
}
