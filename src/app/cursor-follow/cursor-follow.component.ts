import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-cursor-follow',
  templateUrl: './cursor-follow.component.html',
  styleUrls: ['./cursor-follow.component.scss'],
})
export class CursorFollowComponent implements OnInit {
  ngOnInit(): void {
    const cursor = document.getElementById('cursor');
    const cursor2 = document.getElementById('cursor2');
    const cursor3 = document.getElementById('cursor3');

    document.addEventListener('mousemove', function (n) {
      if (cursor) {
        cursor.style.left = n.clientX + 'px';
        cursor.style.top = n.clientY + 'px';
        cursor2!.style.left = n.clientX + 'px';
        cursor2!.style.top = n.clientY + 'px';
        cursor3!.style.left = n.clientX + 'px';
        cursor3!.style.top = n.clientY + 'px';
      }
    });
  }
}
